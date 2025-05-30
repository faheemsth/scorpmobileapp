import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as Location from 'expo-location';
import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {fetchText} from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const base_url = 'https://api.convosoftserver.com/api/'; // Private variable
const keys = {
  token: 'TOKEN',
  user: 'USER',
  clockedIn: 'CLOCKED_IN',
  clockedInTime: 'CLOCKED_IN_TIME',
  clockedOutTime: 'CLOCKED_OUT_TIME',
  hasSeenOnboarding: 'HAS_SEEN_ONBOARDING',
};

const storeData = async (key, data) => {
  try {
    const d = typeof data == 'string' ? data : JSON.stringify(data);
    console.log('storing ', key, typeof d, d);
    await AsyncStorage.setItem(key, d);
  } catch (error) {
    return Promise.reject(error);
  }
};
const getData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const download = async (name, url) => {
  console.log('Downloading', url);
  const dotSplittedUrl = String(url).split('.');
  const extension = dotSplittedUrl.at((dotSplittedUrl?.length ?? 1) - 1);
  const fileName = `${name}.${extension}`;

  // Path for documentDirectory (default Expo location)
  const downloadPath = FileSystem.cacheDirectory + fileName;

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    downloadPath,
    {},
    downloadProgress => {
      const progress =
        (downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite) *
        100;
      console.info('Downloaded ', progress, '%');
    },
  );

  try {
    const {uri} = await downloadResumable.downloadAsync();
    console.log('Finished downloading to', uri);

    // Now open share dialog for saving in Downloads
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
      console.log('File shared successfully.');
    } else {
      console.log('Sharing not available on this device');
    }
  } catch (e) {
    console.error(e);
  }
};

const LocationLayer = (() => {
  const requestPermissionsAndLocation = async () => {
    const {status: foregroundStatus} =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      if (!!!(await Location.hasServicesEnabledAsync()))
        return Promise.reject({message: 'Please turn on location'});

      let lnp = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 5000,
        timeout: 4500,
      });
      if (!!lnp.mocked) {
        return Promise.reject({message: 'you are using mock location'});
      }
      return lnp;
    }
  };
  const getDistanceFromLatLonInM = async (lat1, lon1, lat2, lon2) => {
    var R = 6378137; // Radius of the earth in m
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    // sine(latitude)^2 + cos(lat1)*cos(lat2) * sine(longitude)^2 = point angle
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in m
    return d;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  return {
    requestPermissionAndLocation: requestPermissionsAndLocation,
    getDistanceFromLatLonInM: getDistanceFromLatLonInM,
    deg2rad: deg2rad,
  };
})();

const TasksLayer = (() => {
  const markCompleted = async id => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}TaskStatusChange`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({id: id}),
    });
    return (await res.json())?.['status'] == 'success';
  };
  const getTasks = async () => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}tasklist`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  };
  const createTask = async ({
    task_name,
    brand_id,
    region_id,
    branch_id,
    assigned_to,
    assign_type,
    due_date,
    start_date,
    related_to,
    related_type,
    remainder_date,
    description,
    visibility = 'public',
    remainder_time,
  }) => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}createtask`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        task_name,
        brand_id,
        region_id,
        branch_id,
        assigned_to,
        assign_type,
        due_date,
        start_date,
        related_to,
        related_type,
        remainder_date,
        description,
        visibility,
        remainder_time,
      }),
    });
    return await res.json();
  };
  const getTaskDetails = async task_id => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}getTaskDetails`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({task_id}),
    });
    return await res.json();
  };
  return {
    markCompleted,
    createTask,
    getTasks,
    getTaskDetails,
  };
})();

const AuthLayer = (() => {
  const logOut = async () => {
    Object.values(keys).forEach(v => storeData(v, ''));
    GoogleSignin.signOut();
  };

  const editProfile = async ({email, name, phone, address}) => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}editProfile`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({email, name, phone, address}),
    });
    return await res.json();
  };

  const getUserProfile = async () => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}getUserProfile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const profData = await data?.['profileData'];
    const linkCorrectedData = {
      ...profData,
      avatar: !!!profData.avatar
        ? ''
        : `${data?.avtar_base_url}${profData.avatar}`,
      employee_docs: {
        base_url: data?.doc_base_url,
        data: data?.employee_docs,
      },
    };
    console.log('getUserProfile', linkCorrectedData);
    return linkCorrectedData;
  };

  const postGoogleLoginReq = async email => {
    const res = await fetch(`${base_url}googlelogin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email}),
    });
    const response = await res.json();
    const data = response['data'];
    if (!!!data || !!!data?.['token'])
      return Promise.reject({message: 'Authentication error'});
    const token = data['token'];
    const user = data['user'];
    storeData(keys.token, token);
    storeData(keys.user, user);
    return data;
  };

  const getById = async (type, id) => {
    console.log('trying to get ', type, id);
    if (type != 'region' && type != 'branch' && type != 'user')
      return Promise.reject({
        message: 'only region, branch or user is allowed as type',
      });

    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const body =
      type == 'branch'
        ? {branchID: id}
        : type == 'region'
        ? {regionID: id}
        : {userID: id};
    const res = await fetch(`${base_url}${type}Detail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  };
  const login = async (email, password) => {
    console.log(`incomming info is :{email: ${email}, password: ${password}}`);
    if (!!!email) return Promise.reject({message: 'email is undefined'});
    if (!!!password) return Promise.reject({message: 'password is undefined'});
    if (typeof email != 'string')
      return Promise.reject({message: 'email must be a string'});
    if (typeof password != 'string')
      return Promise.reject({message: 'password must be a string'});
    const res = await fetch(`${base_url}login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const response = await res.json();
    console.log('login response is', response);
    const data = response['data'];
    if (!!!data || !!!data?.['token'])
      return Promise.reject({message: 'Authentication error'});
    const token = data?.['token'];
    const user = data['user'];
    storeData(keys.token, token);
    storeData(keys.user, user);

    return data;
  };
  const getUserAsync = async () => await getUserProfile();
  const getUserBranchAsync = async () => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}getUserBranch`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  };
  const getMeta = async () => {
    const res = await fetch(`${base_url}appMeta`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data?.['metaData'];
  };
  const allowEmailPassLogin = async () =>
    (await getMeta())?.['isLoginForm'] == 1;

  return {
    login,
    getUserAsync,
    getUserBranchAsync,
    getById,
    logOut,
    postGoogleLoginReq,
    getUserProfile,
    getMeta,
    allowEmailPassLogin,
    editProfile,
  };
})();

const isAtSite = async (userLatLng, branchLatLng) => {
  const attendanceLayer = AttendanceLayer;
  const distance = await LocationLayer.getDistanceFromLatLonInM(
    userLatLng.lat,
    userLatLng.lng,
    branchLatLng.lat,
    branchLatLng.lng,
  );
  const allowedRadius = await attendanceLayer.allowedRadius();
  console.info('distance', distance, 'allowedRadius', allowedRadius);
  return {atSite: distance <= allowedRadius, distance, allowedRadius};
};

const AttendanceLayer = (() => {
  const authLayer = AuthLayer;
  const locLayer = LocationLayer;
  const status = {
    LOGIN_FROM_ANYWHERE: 3,
    LOGIN_FROM_SPECIFIC_LOCATION: 2,
    LOGIN_FROM_BRANCH: 1,
  };

  const allowedRadius = async () =>
    (await authLayer.getMeta())?.['allowedRadius'];

  const clockIn = async () => {
    const user = await authLayer.getUserProfile();

    const lnp = await locLayer.requestPermissionAndLocation();

    if (!!!lnp?.coords?.latitude || !!!lnp?.coords?.longitude)
      return Promise.reject({message: 'unable to locate you'});

    const branchRes = await authLayer.getUserBranchAsync();

    if (
      user?.['isloginrestrickted'] == 1 &&
      user?.['isloginanywhere'] == 0 &&
      (!!!branchRes?.['branch']?.['latitude'] ||
        !!!branchRes?.['branch']?.['longitude'])
    )
      return Promise.reject({message: 'branch location info is missing'});

    const branchLatLng = {
      lat: branchRes?.['branch']?.['latitude'],
      lng: branchRes?.['branch']?.['longitude'],
    };

    const userLatLng = {
      lat: user?.['latitude'],
      lng: user?.['longitude'],
    };
    if (
      user?.['isloginrestrickted'] == 2 &&
      (!!!userLatLng?.lat || !!!userLatLng?.lng)
    )
      return Promise.reject({
        message: 'user allowed clocking location is missing',
      });

    let clockInStatus = -1;
    if (user?.['isloginanywhere'] == 1) {
      clockInStatus = status.LOGIN_FROM_ANYWHERE;
    } else if (
      user?.['isloginanywhere'] == 0 &&
      user?.['isloginrestrickted'] == 2
    ) {
      clockInStatus = status.LOGIN_FROM_SPECIFIC_LOCATION;
    } else {
      clockInStatus = status.LOGIN_FROM_BRANCH;
    }

    const {atSite, distance, allowedRadius} = await isAtSite(
      {lat: lnp.coords.latitude, lng: lnp.coords.longitude},
      user?.['isloginrestrickted'] == 1 ? branchLatLng : userLatLng,
    );
    if (!!!atSite && user?.['isloginanywhere'] == 0) {
      return Promise.reject({
        message:
          'you are out of the ' +
          allowedRadius +
          ' meters radius from your branch' +
          'you are ' +
          distance +
          ' meters away',
      });
    }
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}clockIn`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        latitude: lnp.coords.longitude,
        longitude: lnp.coords.longitude,
        clockInStatus: clockInStatus,
      }),
    });
    const data = await res.json();
    const clockedIn = data['success'];
    console.log('clockin response ', data);
    if (!!!clockedIn) {
      return Promise.reject(data);
    }

    storeData(keys.clockedIn, clockedIn);
    storeData(keys.clockedInTime, new Date().getTime());
    storeData(keys.clockedOutTime, '');

    return data;
  };
  const countDutyTime = async () => {
    const cit = JSON.parse(await getData(keys.clockedInTime));
    const cot = JSON.parse(await getData(keys.clockedOutTime));

    if (!!!cit) return {hours: 0, minutes: 0};
    if (!!!cot) return {hours: 0, minutes: 0};

    const diffMs = cot - cit;
    const hours = Math.floor(diffMs / 3.6e6);
    const minutes = Math.floor((diffMs / 60000) % 60);
    return {hours, minutes};
  };
  const hasCompletedHours = async () => {
    const branch = (await authLayer.getUserBranchAsync()).branch;
    console.log('branch is: ', branch);
    const cit = JSON.parse(await getData(keys.clockedInTime));
    console.log('cit', cit);
    const now = new Date().getTime();

    const diffMs = now - cit;
    const diffHrs = Math.floor(diffMs / 3.6e6);
    const diffMinutes = Math.floor((diffMs / 60000) % 60);
    console.log(
      'diffHrs',
      diffHrs,
      'diffMinutes',
      diffMinutes,
      `(${branch?.shift_time} ?? 8 = ${branch?.shift_time ?? 8}) <= ${diffHrs}`,
      branch?.shift_time ?? 8 <= diffHrs,
    );
    return (branch?.shift_time ?? 8) <= diffHrs;
  };
  const clockOut = async reason => {
    const user = await authLayer.getUserProfile();

    const lnp = await locLayer.requestPermissionAndLocation();

    if (!!!lnp?.coords?.latitude || !!!lnp?.coords?.longitude)
      return Promise.reject({message: 'unable to locate you'});

    const branchRes = await authLayer.getUserBranchAsync();

    if (
      user?.['isloginrestrickted'] == 1 &&
      user?.['isloginanywhere'] == 0 &&
      (!!!branchRes?.['branch']?.['latitude'] ||
        !!!branchRes?.['branch']?.['longitude'])
    )
      return Promise.reject({message: 'branch location info is missing'});

    const branchLatLng = {
      lat: branchRes?.['branch']?.['latitude'],
      lng: branchRes?.['branch']?.['longitude'],
    };

    const userLatLng = {
      lat: user?.['latitude'],
      lng: user?.['longitude'],
    };
    if (
      user?.['isloginrestrickted'] == 2 &&
      (!!!userLatLng?.lat || !!!userLatLng?.lng)
    )
      return Promise.reject({
        message: 'user allowed clocking location is missing',
      });

    const {atSite, distance, allowedRadius} = await isAtSite(
      {lat: lnp.coords.latitude, lng: lnp.coords.longitude},
      user?.['isloginrestrickted'] == 1 ? branchLatLng : userLatLng,
    );

    if (!!!atSite && user?.['isloginanywhere'] == 0) {
      return Promise.reject({
        message:
          'you are out of the ' +
          allowedRadius +
          ' meters radius from your branch ' +
          'you are ' +
          distance +
          ' meters away',
      });
    }

    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }

    let clockOutStatus = -1;
    if (user?.['isloginanywhere'] == 1) {
      clockOutStatus = status.LOGIN_FROM_ANYWHERE;
    } else if (
      user?.['isloginanywhere'] == 0 &&
      user?.['isloginrestrickted'] == 2
    ) {
      clockOutStatus = status.LOGIN_FROM_SPECIFIC_LOCATION;
    } else {
      clockOutStatus = status.LOGIN_FROM_BRANCH;
    }

    const res = await fetch(`${base_url}clockOut`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        latitude: lnp.coords.latitude,
        longitude: lnp.coords.longitude,
        earlyCheckOutReason: reason ?? null,
        clockOutStatus: clockOutStatus,
      }),
    });
    const data = await res.json();
    const clockedOut = data['success'];
    if (!!!clockedOut) {
      return Promise.reject(data);
    }

    storeData(keys.clockedIn, !clockedOut);
    storeData(keys.clockedOutTime, new Date().getTime());

    return data;
  };
  const getAttendanceViewData = async (startDate, endDate) => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(
      `${base_url}attendance/view?start_date=${startDate}&end_date=${endDate}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    return data;
  };
  const clockInStatus = async () => {
    return JSON.parse(await getData(keys.clockedIn));
  };
  const getClockinTimeAsync = async () => {
    const timeStr = await getData(keys.clockedInTime);
    if (!!!timeStr) return undefined;
    const time = new Date();
    time.setTime(JSON.parse(timeStr));
    return time;
  };
  const getClockoutTimeAsync = async () => {
    const timeStr = await getData(keys.clockedOutTime);
    if (!!!timeStr) return undefined;
    const time = new Date();
    time.setTime(JSON.parse(timeStr));
    return time;
  };
  return {
    clockIn,
    clockOut,
    getAttendanceViewData,
    clockInStatus,
    getClockinTimeAsync,
    getClockoutTimeAsync,
    hasCompletedHours,
    countDutyTime,
    allowedRadius,
  };
})();

const LeavesLayer = (() => {
  const getLeaves = async () => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}getLeaves`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  };
  const getLeavesTypesAndAllowed = async () => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const res = await fetch(`${base_url}LeaveTypeDetail`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  };

  const submitRequest = async ({
    brand_id,
    region_id,
    branch_id,
    leave_type_id,
    leave_reason,
    start_date,
    end_date,
    is_compensatory,
    remark = 'no remarks',
  }) => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject({message: 'no token'});
    }
    const requestBody = JSON.stringify({
      brand_id,
      region_id,
      branch_id,
      leave_type_id,
      leave_reason,
      start_date,
      end_date,
      is_compensatory,
      remark,
    });
    console.info('requestbody: ' + requestBody);
    const res = await fetch(`${base_url}createLeave`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: requestBody,
    });
    const response = await res.json();
    console.log('leave request response', JSON.stringify(response));
    return response?.['success'] == 'Leave successfully created.';
  };

  return {getLeaves, getLeavesTypesAndAllowed, submitRequest};
})();

const datalayer = (() => {
  const locationLayer = LocationLayer;
  const taskLayer = TasksLayer;
  const authLayer = AuthLayer;
  const attendanceLayer = AttendanceLayer;
  const leavesLayer = LeavesLayer;

  return {
    KEYS: keys,
    locationLayer,
    taskLayer,
    authLayer,
    attendanceLayer,
    leavesLayer,
    getData,
    storeData,
  };
})();

export default datalayer;

export function useUser() {
  const [user, setUser] = useState({});
  const u = useCallback(() => {
    fetchUserAsync = async () => {
      setUser(await datalayer.authLayer.getUserProfile());
    };
    fetchUserAsync()?.catch(e => Alert.alert(e.message));
  }, [user]);
  useEffect(() => {
    u();
  }, []);
  return user;
}

export function useLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [leavesTypes, setLeavesTypes] = useState([]);

  const fetchAsync = async () => {
    try {
      const lvs = (await datalayer.leavesLayer.getLeaves())?.['leaves'];
      const lvsTypes = (
        await datalayer.leavesLayer.getLeavesTypesAndAllowed()
      )?.['leaveType'];

      const lvsWithType = lvs?.map(e => ({
        ...e,
        leave_type: lvsTypes?.find(f => f?.['id'] === e?.['leave_type_id'])?.[
          'title'
        ],
      }));

      const lvsTypesWithUsed = lvsTypes
        ?.map(e => {
          const usedLeaves =
            lvs
              ?.filter(f => f?.['leave_type_id'] === e?.['id'])
              ?.reduce((prev, current) => {
                let endDate = new Date(current?.['end_date']);
                let startDate = new Date(current?.['start_date']);
                let daysDiff = (endDate - startDate) / 86400000 + 1;
                console.log(
                  'daysDiff',
                  daysDiff,
                  startDate.getDate(),
                  endDate.getDate(),
                );
                let totalLeaves = daysDiff;
                if (typeof prev === 'number') {
                  totalLeaves = prev + daysDiff;
                }
                return totalLeaves;
              }, 0) ?? 0;
          console.log('usedLeaves', usedLeaves, e.title);
          return {
            ...e,
            used: usedLeaves,
          };
        })
        ?.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });

      console.log(
        'useLeaves',
        lvs?.length,
        lvsTypes?.length,
        lvsTypesWithUsed.map(e => e.id),
      );

      setLeaves(lvsWithType ?? []);
      setLeavesTypes(lvsTypesWithUsed ?? []);
    } catch (error) {
      Alert.alert('Error', error?.['message']);
    }
  };
  useEffect(() => {
    fetchAsync()?.catch(console.error);
  }, []);
  return [[leaves, leavesTypes], fetchAsync];
}

export function useAttendance() {
  const [attendance, setAttendance] = useState([]);

  const fetchAsync = async (selectedMonth = new Date()) => {
    const firstDate = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1,
    );
    const lastDate = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0,
    );

    const startDate = `1-${
      firstDate.getMonth() + 1
    }-${firstDate.getFullYear()}`;
    const endDate = `${lastDate.getDate()}-${
      lastDate.getMonth() + 1
    }-${lastDate.getFullYear()}`;
    const data = (
      await datalayer.attendanceLayer.getAttendanceViewData(startDate, endDate)
    )?.['data']?.map(d => {
      return {
        ...d,
        status:
          d?.status?.toLowerCase?.() == 'early punch out'
            ? 'Early Leave'
            : d?.status?.toLowerCase?.() == 'present'
            ? 'Full Day'
            : d?.status,
      };
    });
    setAttendance(data);
  };

  useEffect(() => {
    fetchAsync()?.catch(e => Alert.alert(e.message));
  }, []);
  return [attendance, fetchAsync];
}

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  fetchAsync = async () => {
    const data = await datalayer.taskLayer.getTasks();
    setTasks(data['tasks']);
  };
  useEffect(() => {
    fetchAsync()?.catch(e => Alert.alert(e.message));
  }, []);
  return [tasks, fetchText];
}

export function useClockinStatus() {
  const [clockinStatus, setClockinStatus] = useState(false);
  const [attendance, fetchAttendance] = useAttendance();
  const [clockinTime, setClockinTime] = useState(undefined);
  const [clockoutTime, setClockoutTime] = useState(undefined);
  const [totalHours, setTotalHours] = useState({hours: 0, minutes: 0});

  const fetchAsync = async () => {
    await fetchAttendance(new Date());
  };
  const memoizedData = useCallback(() => {
    const cit = attendance?.[attendance?.length - 1]?.['clock_in'];
    const cot = attendance?.[attendance?.length - 1]?.['clock_out'];

    const clockedIn = !!cit && cit != '00:00:00';
    const clockedOut = !!cot && cot != '00:00:00';
    const state = clockedIn && !clockedOut;

    const today = new Date();
    console.log('today in utc', today.toUTCString());
    const citd = clockedIn ? new Date(today.toUTCString()) : undefined;
    const cotd = clockedOut ? new Date(today.toUTCString()) : undefined;

    if (!!citd) {
      const [h, m, s] = cit?.split(':');
      citd.setHours(+h);
      citd.setMinutes(m);
      citd.setSeconds(s);
    }
    if (!!cotd) {
      const [h, m, s] = cot?.split(':');
      cotd.setHours(+h);
      cotd.setMinutes(m);
      cotd.setSeconds(s);
    }

    console.log('clockin-time', cit, citd);
    console.log('clockout-time', cot, cotd);

    storeData(keys.clockedInTime, citd?.getTime() ?? '');
    storeData(keys.clockedOutTime, cotd?.getTime() ?? '');
    storeData(keys.clockedIn, state ?? false);

    datalayer.attendanceLayer
      .countDutyTime()
      .then(e => setTotalHours(e ?? {hours: 0, minutes: 0}));

    setClockinTime(citd);
    setClockoutTime(cotd);
    setClockinStatus(state);
  }, [attendance]);

  useEffect(() => {
    memoizedData();
  }, [attendance]);

  return [{clockinStatus, clockoutTime, clockinTime, totalHours}, fetchAsync];
}
