// Import the necessary Turf functions
import { lineString, lineIntersect, booleanCrosses } from '@turf/turf';

// Converts an array of coordinates to a LineString feature
const coordinatesToLineString = (coordinates) => {
    console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', coordinates)
    return lineString(coordinates.map(coord => [coord.longitude, coord.latitude]));
};

// Checks if the new line created by the last point and the new point intersects with any other line in the polygon
export const doesLineIntersect = (coordinates, newCoordinate) => {
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ', coordinates, newCoordinate)
    const lastCoord = coordinates[coordinates.length - 1];

    let line1 = null;
    if (lastCoord) {
        line1 = coordinatesToLineString([lastCoord, newCoordinate]);
    }
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', line1)

    // Check intersection with all lines of the current polygon except the last one
    for (let i = 0; i < coordinates.length - 2; i++) {
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ::::::::::::::::::::###########  ',coordinates, lastCoord,coordinates[0], coordinates[1])
        const line2 = coordinatesToLineString([coordinates[i], coordinates[i + 1]]);
        const line3 = coordinatesToLineString([coordinates[coordinates.length - 1], coordinates[coordinates.length - 2]]);
        const line4 = coordinatesToLineString([coordinates[0], newCoordinate]);
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line2 ', line2.geometry.coordinates)
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line1 ', line1.geometry.coordinates)
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line3 ', line3.geometry.coordinates)
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line4 ', line4.geometry.coordinates)
        const intersection = lineIntersect(line1, line2);
        const lastIntersection = lineIntersect(line4, line3);
        console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ::::::: ', intersection, lastIntersection)
        if (intersection.features.length > 0 || lastIntersection.features.length > 0) {
            // If the lines intersect, return true
            return true;
        }
    }

    // No intersections found, return false
    return false;
};



// Check if a new segment intersects with existing segments in the polygon
export const checkIntersection = (coordinates, newCoordinate) => {
    if (coordinates.length < 2) return false;

    const newLine = lineString([
        [coordinates[coordinates.length - 1].longitude, coordinates[coordinates.length - 1].latitude],
        [newCoordinate.longitude, newCoordinate.latitude]
    ]);

    for (let i = 0; i < coordinates.length - 1; i++) {
        const existingLine = lineString([
            [coordinates[i].longitude, coordinates[i].latitude],
            [coordinates[i + 1].longitude, coordinates[i + 1].latitude]
        ]);
        if (booleanCrosses(newLine, existingLine)) {
            return true;
        }
    }

    // Additionally, check if the new line intersects with the closing line of the polygon
    if (coordinates.length > 2) {
        const closingLine = lineString([
            [coordinates[coordinates.length - 1].longitude, coordinates[coordinates.length - 1].latitude],
            [coordinates[0].longitude, coordinates[0].latitude]
        ]);
        if (booleanCrosses(newLine, closingLine)) {
            return true;
        }
    }

    return false;
};






// // Import the necessary Turf functions
// import { lineString, lineIntersect } from '@turf/turf';

// // Converts an array of coordinates to a LineString feature
// const coordinatesToLineString = (coordinates) => {
//     console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', coordinates)
//     return lineString(coordinates.map(coord => [coord.longitude, coord.latitude]));
// };

// // Checks if the new line created by the last point and the new point intersects with any other line in the polygon
// export const doesLineIntersect = (coordinates, newCoordinate) => {
//     let lines = []
//     const lastCoord = coordinates[coordinates.length - 1];
//     let line1 = null;
//     if (lastCoord) {
//         line1 = coordinatesToLineString([lastCoord, newCoordinate]);
//     }
//     if (coordinates.length > 2) {
//         const reverseCoordinates = coordinates.slice().reverse();
//         for (let i = 0; i < reverseCoordinates.length; i++) {
//             if(reverseCoordinates[i + 1]){
//                 lines.push(coordinatesToLineString([reverseCoordinates[i], reverseCoordinates[i + 1]]))
//             }
//         }
//         console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', line1,lines)
//     }

    
//     // Check intersection with all lines of the current polygon except the last one
//     for (let i = 0; i < coordinates.length - 2; i++) {
//         console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ::::::::::::::::::::###########  ', coordinates, coordinates[coordinates.length - 1], i, coordinates[i], coordinates[i + 1])
//         const line2 = coordinatesToLineString([coordinates[i], coordinates[i + 1]]);
//         console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line2 ', line2.geometry.coordinates)
//         console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD :::::::::::::::::::: line1 ', line1.geometry.coordinates)
//         for (let j = 0; j < lines.length; j++) {
//             const element = lines[j];
//             const intersection = lineIntersect(line1, element);
//             console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ::::::: ',j, element.geometry.coordinates, intersection)
//             if (intersection.features.length > 0) {
//                 // If the lines intersect, return true
//                 return true;
//             }
            
//         }
//     }

//     // No intersections found, return false
//     return false;
// };