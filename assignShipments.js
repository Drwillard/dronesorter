export default (drones, deliveries) => {

    // sort drones in-place by capacity, descending order
    drones.sort((a, b) => b.capacity - a.capacity)

    // add some properties to the drones object
    drones = drones.map(obj => ({ ...obj, remaining_capacity: obj.capacity, deliveries: [] }))

    // sort deliveries in-place by weight, ascending order
    deliveries.sort((a, b) => a.weight - b.weight)

    // init the final container of all trips
    const deliveryPlan = []

    while (deliveries.length) {

        for (let drone of drones) {

            // use a cheap hack to deep clone an object
            const droneClone = JSON.parse(JSON.stringify(drone))

            // iterate backwards so we don't break the index when we remove items
            for (let i = deliveries.length - 1; i >= 0; i--) {

                // if an item fits...
                if (droneClone.remaining_capacity >= deliveries[i].weight) {

                    // 1) decrement the weight
                    droneClone.remaining_capacity -= deliveries[i].weight

                    // 2) add to the delivery list
                    droneClone.deliveries.push(deliveries[i])

                    // 3)remove from the destination array
                    deliveries.splice(i, 1);
                }

            }

            // if anything fit, add to the return collection
            if (droneClone.deliveries.length) {
                deliveryPlan.push(droneClone)
            }
        }
    }

    return deliveryPlan
}
