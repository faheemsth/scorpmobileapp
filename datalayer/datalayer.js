import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const base_url = 'https://api.scorp.co/api/'; // Private variable
const keys = {
  token: 'TOKEN',
  user: 'USER',
  clockedIn: 'CLOCKED_IN',
  clockedInTime: 'CLOCKED_IN_TIME',
  clockedOutTime: 'CLOCKED_OUT_TIME',
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

const isAtSite = async (userLatLng, branchLatLng) => {
  const distance = await LocationLayer.getDistanceFromLatLonInM(
    userLatLng.lat,
    userLatLng.lng,
    branchLatLng.lat,
    branchLatLng.lng,
  );
  console.info('distance', distance);
  return distance <= 100;
};

const LocationLayer = (() => {
  const requestPermissionsAndLocation = async () => {
    const {status: foregroundStatus} =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      console.log('trying to get current location');
      let lnp = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 5000,
        timeout: 4500,
      });
      if (!!lnp.mocked) {
        return Promise.reject('you are using mock location');
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
      return Promise.reject('no token');
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
      return Promise.reject('no token');
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
      return Promise.reject('no token');
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
      return Promise.reject('no token');
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
  const getById = async (type, id) => {
    console.log('trying to get ', type, id);
    if (type != 'region' && type != 'branch' && type != 'user')
      return Promise.reject('only region, branch or user is allowed as type');

    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject('no token');
    }
    const res = await fetch(`${base_url}${type}Detail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: `{"${type}ID",${id}}`,
    });
    return await res.json();
  };
  const login = async (email, password) => {
    console.log(`incomming info is :{email: ${email}, password: ${password}}`);
    if (!!!email) return Promise.reject('email is undefined');
    if (!!!password) return Promise.reject('password is undefined');
    if (typeof email != 'string')
      return Promise.reject('email must be a string');
    if (typeof password != 'string')
      return Promise.reject('password must be a string');
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
    const data = response['data'];
    const token = data['token'];
    const user = data['user'];
    storeData(keys.token, token);
    storeData(keys.user, user);

    return data;
  };
  const getUserAsync = async () => JSON.parse(await getData(keys.user));
  const getUserBranchAsync = async () => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject('no token');
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
  return {login, getUserAsync, getUserBranchAsync, getById};
})();

const AttendanceLayer = (() => {
  const authLayer = AuthLayer;
  const locLayer = LocationLayer;

  const clockIn = async () => {
    const lnp = await locLayer.requestPermissionAndLocation();

    console.info('lat', lnp.coords.latitude, 'lng', lnp.coords.longitude);

    const branchRes = await authLayer.getUserBranchAsync();
    const branchLatLng = {
      lat: branchRes['branch']['latitude'],
      lng: branchRes['branch']['longitude'],
    };
    if (
      !!!(await isAtSite(
        {lat: lnp.coords.latitude, lng: lnp.coords.longitude},
        branchLatLng,
      ))
    ) {
      return Promise.reject(
        'you are out of the 100 meters radius from your branch',
      );
    }
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject('no token');
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

    console.log('cit', cit, 'cot', cot, 'cot-cit', 'hours', hours, 'minutes', minutes);

    return {hours, minutes};
  };
  const hasCompletedHours = async totalDutyHoursPerDay => {
    const cit = JSON.parse(await getData(keys.clockedInTime));
    console.log('cit', cit);
    const now = new Date().getTime();

    const diffMs = now - cit;
    const diffHrs = Math.floor(diffMs / 3.6e6);
    const diffMinutes = Math.floor((diffMs / 60000) % 60);
    console.log('diffHrs', diffHrs, 'diffMinutes', diffMinutes);
    return totalDutyHoursPerDay <= diffHrs;
  };
  const clockOut = async reason => {
    const lnp = await locLayer.requestPermissionAndLocation();

    console.info('lat', lnp.coords.latitude, 'lng', lnp.coords.longitude);

    const branchRes = await authLayer.getUserBranchAsync();
    const branchLatLng = {
      lat: branchRes['branch']['latitude'],
      lng: branchRes['branch']['longitude'],
    };
    if (
      !!!(await isAtSite(
        {lat: lnp.coords.latitude, lng: lnp.coords.longitude},
        branchLatLng,
      ))
    ) {
      return Promise.reject(
        'you are out of the 100 meters radius from your branch',
      );
    }

    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject('no token');
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
      return Promise.reject('no token');
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
    return res.json();
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
  };
})();

const LeavesLayer = (() => {
  const getLeaves = async () => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject('no token');
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
      return Promise.reject('no token');
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
    remark = 'no remarks',
  }) => {
    const token = await getData(keys.token);
    if (!!!token) {
      return Promise.reject('no token');
    }
    const res = await fetch(`${base_url}createLeave`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        brand_id,
        region_id,
        branch_id,
        leave_type_id,
        leave_reason,
        start_date,
        end_date,
        remark,
      }),
    });
    console.log('submit leave request', await res.json());
    const response = (await res.json())['success'];
    return response == 'Leave successfully created.';
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
