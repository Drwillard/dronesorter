export default (drones, destinations) => {

    // find highest capacity drone
    const maxCapacity = drones.reduce((acc, d) => {
        return (acc = acc > d.capacity ? acc : d.capacity);
    }, 0);
    
    // find largest item
    const maxItem = destinations.reduce((acc, d) => {
        return (acc = acc > parseFloat(d.weight) ? acc : parseFloat(d.weight));
    }, 0)
    
    if (maxItem > maxCapacity) 
        throw `Item with weight ${maxItem} is too large for drones; max capacity is ${maxCapacity}`
    
}