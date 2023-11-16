const applyProgressiveOverload = (currentWeekRoutine, previousWeekRoutine) => {
    // Iterating over each day in the week
    currentWeekRoutine.forEach((day, index) => {

        const previousWeekDay = previousWeekRoutine[index];
  
        // Iterating over each exercise of the day
        // Each "group" in the array muscleGroups contains props: muscle, exercise, weight, and sets
        day.muscleGroups.forEach(group => {

            const previousExercise = previousWeekDay.muscleGroups.find(prevWeekGroup => prevWeekGroup.exercise === group.exercise);

            // Implementing logic to calculate changes to weight or sets for progressive overloading
            if (previousExercise) {
    
            group.weight = calculateNewWeight(previousExercise.weight);
            group.sets = calculateNewSets(previousExercise.sets);
            }
      });
    });
  
    return currentWeekRoutine;
};  

const calculateNewWeight = (previousWeight) => {
    return Number(previousWeight) + 5;

};

const calculateNewSets = (previousSets) => {
    return Number(previousSets) + 1;

};

export default applyProgressiveOverload