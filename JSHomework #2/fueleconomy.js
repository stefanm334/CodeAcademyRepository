/* A car uses 7 litres of fuel on 100km. How much fuel will the car spend
driving 43 kilometers? Use a loop instead of a mathematical formula. */

function fuelEconomy(distanceInKm){
    x = distanceInKm
    var averageFuelEco100km = 7;
    var averageFuelEco1km = averageFuelEco100km / 100;
    for (let i = 0; i <= x ; i++) {
        var fuelEco = i * averageFuelEco1km
    }
    console.log(fuelEco)
}

fuelEconomy(43)
