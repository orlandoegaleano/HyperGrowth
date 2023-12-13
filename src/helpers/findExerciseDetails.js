const findExerciseDetails = (mesocycle, weekIndex, dayTitle, exerciseName) => {
    // Fetch current exercise details
    const currentWeek = mesocycle.weeks[weekIndex];
    const currentDay = currentWeek.days.find(d => d.title === dayTitle);
    const currentExercise = currentDay.exerciseDetails.find(e => e.name === exerciseName);

    // Fetch previous exercise details, if not the first week
    let previousExercise = null;
    if (weekIndex > 0) {
        const previousWeek = mesocycle.weeks[weekIndex - 1];
        const previousDay = previousWeek.days.find(d => d.title === dayTitle);
        previousExercise = previousDay ? previousDay.exerciseDetails.find(e => e.name === exerciseName) : null;
    }

    let nextExercise = null;
    if (weekIndex < mesocycle.weeks.length - 1) {
        const nextWeek = mesocycle.weeks[weekIndex + 1];
        const nextDay = nextWeek.days.find(d => d.title === dayTitle);
        nextExercise = nextDay ? nextDay.exerciseDetails.find(e => e.name === exerciseName) : null;
    }

    return {
        currentExercise,
        previousExercise,
        nextExercise
    };
};

export default findExerciseDetails;
