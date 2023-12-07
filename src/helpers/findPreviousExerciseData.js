const findPreviousExerciseData = (mesocycle, weekIndex, dayTitle, exerciseName) => {
    if (weekIndex === 0) {
        return null; 
    }
    const previousWeek = mesocycle.weeks[weekIndex - 1];
    const previousDay = previousWeek.days.find(d => d.title === dayTitle);
    if (!previousDay) {
        console.log("Previous day not found:", dayTitle);
        return null;
    }
    const previousExercise = previousDay.muscleGroups.find(mg => mg.name === exerciseName);
    if (!previousExercise) {
        console.log("Previous exercise not found:", exerciseName);
        return null;
    }
    return previousExercise;
};
