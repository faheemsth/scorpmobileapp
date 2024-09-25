import AsyncStorage from '@react-native-async-storage/async-storage';

// Store or remove token
export const storeToken = async (value) => {
    try {
        if (value != null) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('token', jsonValue);
            console.log("Token stored successfully:", jsonValue);
        } else {
            await AsyncStorage.removeItem('token');
            console.log("Token removed successfully.");
        }
    } catch (e) {
        console.error("Error storing/removing token:", e);
    }
};

// Retrieve token
export const GetToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('token');
        console.log("Token retrieved:", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error retrieving token:", e);
    }
};

// Store or remove biometric data
export const storeBio = async (value) => {
    try {
        if (value != null) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('biometric', jsonValue);
            console.log("Biometric data stored successfully:", jsonValue);
        } else {
            await AsyncStorage.removeItem('biometric');
            console.log("Biometric data removed successfully.");
        }
    } catch (e) {
        console.error("Error storing/removing biometric data:", e);
    }
};

// Retrieve biometric data
export const GetBioMetric = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('biometric');
        console.log("Biometric data retrieved:", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error retrieving biometric data:", e);
    }
};

// Store or remove furniture data
export const storeFurniture = async (value) => {
    try {
        if (value != null) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('furniture', jsonValue);
            console.log("Furniture data stored successfully:", jsonValue);
        } else {
            await AsyncStorage.removeItem('furniture');
            console.log("Furniture data removed successfully.");
        }
    } catch (e) {
        console.error("Error storing/removing furniture data:", e);
    }
};

// Retrieve furniture data
export const GetFurniture = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('furniture');
        console.log("Furniture data retrieved:", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error retrieving furniture data:", e);
    }
};

// Store or remove description
export const storeDescription = async (value) => {
    try {
        if (value != null) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('description', jsonValue);
            console.log("Description stored successfully:", jsonValue);
        } else {
            await AsyncStorage.removeItem('description');
            console.log("Description removed successfully.");
        }
    } catch (e) {
        console.error("Error storing/removing description:", e);
    }
};

// Retrieve description
export const GetDescription = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('description');
        console.log("Description retrieved:", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error retrieving description:", e);
    }
};

// Store or remove truck details
export const storeTruckDetails = async (value) => {
    try {
        if (value != null) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('truckDetails', jsonValue);
            console.log("Truck details stored successfully:", jsonValue);
        } else {
            await AsyncStorage.removeItem('truckDetails');
            console.log("Truck details removed successfully.");
        }
    } catch (e) {
        console.error("Error storing/removing truck details:", e);
    }
};

// Retrieve truck details
export const GetTruckDetails = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('truckDetails');
        console.log("Truck details retrieved:", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error retrieving truck details:", e);
    }
};

// Store or remove price data
export const storePrice = async (value) => {
    try {
        if (value != null) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('price', jsonValue);
            console.log("Price data stored successfully:", jsonValue);
        } else {
            await AsyncStorage.removeItem('price');
            console.log("Price data removed successfully.");
        }
    } catch (e) {
        console.error("Error storing/removing price data:", e);
    }
};

// Retrieve price data
export const GetPrice = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('price');
        console.log("Price data retrieved:", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error retrieving price data:", e);
    }
};

// Store or remove date/time
export const storeDateTime = async (value) => {
    try {
        if (value != null) {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('dateTime', jsonValue);
            console.log("Date/Time stored successfully:", jsonValue);
        } else {
            await AsyncStorage.removeItem('dateTime');
            console.log("Date/Time removed successfully.");
        }
    } catch (e) {
        console.error("Error storing/removing date/time:", e);
    }
};

// Retrieve date/time
export const GetDateTime = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('dateTime');
        console.log("Date/Time retrieved:", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error retrieving date/time:", e);
    }
};
