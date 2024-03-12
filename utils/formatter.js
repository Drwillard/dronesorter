import chalk from 'chalk';

export default trips => {

    trips.sort((a,b) => a.name.localeCompare(b.name))

    // group by drone name
    let dels = {}
    trips.forEach(t => {

        if (!dels[t.name]){
            dels[t.name] = {}
            dels[t.name].trips = []
        }

        dels[t.name].trips.push(t.deliveries)
    });
    
    let tripCounter = 0

    // show trips for each drone
    for (let d in dels){
        console.log(chalk.bgBlue(d))
        for (let t in dels[d].trips){
            tripCounter++
            console.log(chalk.yellow(`Trip #${parseInt(t) + 1}`))
            const dests = dels[d].trips[t].map(de => `[${de.destination}]`).join(", ")
            console.log(dests)
        }

        console.log()
    }

    // return count of trips
    return tripCounter
}