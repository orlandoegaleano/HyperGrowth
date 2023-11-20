const findPreviousExerciseData = (mesocycle, weekIndex, dayTitle, exerciseName) => {
    if (weekIndex === 0) return null; 
    const previousWeek = mesocycle[weekIndex - 1];
    const previousDay = previousWeek.find(d => d.title === dayTitle);
    return previousDay.muscleGroups.find(e => e.exercise === exerciseName);
};

export default findPreviousExerciseData