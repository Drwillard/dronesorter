# DroneSorter

Simple Node implementation of a solution for a bounded 1 dimensional knapsack problem (or better described as a bin-packing problem).

### Install
```bash
npm install
```

### Run
```bash
node index.js
```

## Notes
See `requirements.txt` for a full description of the task, including sample inputs and outputs. 

Data was generated with ChatGPT and is stored in the `./data` folder in 2 files: 
1) `drones.csv` - a listing of all available drones. Drones are listed in CSV format in a single line, with alternating names and total capacities.
2) `destinations.csv` - a listing of all shipment locations. Destinations are listed in CSV format with 2 columns: a location name and a weight. 

**Data Access**.  The `data.js` module wraps all the data access features; to pull data from another source, this module could be swapped out for another module that implements the `getDrones()` and `getDestinations()` methods.

**Data display**. Similarly, the `formatter.js` module wraps all the data formatting and display features. Alternate display implementations can easily be used by swapping in a module that exposes an appropriate method.


## Algorithm Explanation

Per the instructions - "the goal is to make the fewest number of trips" without regard to distance, time, or other 'real world' constraints - the algorithm attempts to optimize for fewest drone trips overall with a modified First Fit Descending packing algorithm. 

1) Drone list is sorted from *highest*-*capacity* to lowest. 
2) Delivery list is sorted from *lowest*-*weight* to highest. 
3) Iterate over the drone list (beginning with the highest capacity) and then begin packing them with items by iterating <ins>backwards</ins> over the destination list (thus starting with the <ins>largest</ins> items first).  This allows items to be removed from the list without interfering with the indexing.
4) If the number of destinations exceeds the capacity of the drones, the algorithm will cycle through the drones again to create multiple trips for each drone. 
5) There is a sanity check early in the process to ensure that the largest item is smaller than the largest capacity drone.


## Notes

- A First Fit Descending algorithm is most likely <ins>not</ins> the most optimal for all real-world packing situations. Without consideration of more specific constraints - such as the number or efficiency of the drones, distance traveled, item fitment, preferred groupings, relative value of delivery times, etc - it is impossible and unwise to attempt further optimization.

- Additionally, this may cause the largest drones to make multiple trips while smaller drones sit empty, which obviously sacrifices concurrency optimizations during delivery. *However, per the instructions, time/concurrency were not considered in optimization calculations.*

- Other popular dynamic programming and recursive solutions are more suited to 2-dimensional knapsack problems, and were not considered for this solution.