import findExerciseDetails from './findExerciseDetails';

const applyProgressiveOverload = (mesocycle) => {
    const updatedMesocycle = JSON.parse(JSON.stringify(mesocycle));

    for (let weekIndex = 0; weekIndex < updatedMesocycle.weeks.length; weekIndex++) {
        updatedMesocycle.weeks[weekIndex].days.forEach(day => {
            day.exerciseDetails.forEach(exerciseDetails => {

                const baseWeight = getBaseWeight(updatedMesocycle, weekIndex, day, exerciseDetails);
                exerciseDetails.weight = calculateNewWeight(baseWeight, weekIndex);

                if (weekIndex < updatedMesocycle.weeks.length) {

                    const nextWeekExerciseDetails = findExerciseDetails(updatedMesocycle, weekIndex, day.title, exerciseDetails.name).nextExercise;
                    
                    if (nextWeekExerciseDetails) {
                        nextWeekExerciseDetails.sets = updateSetsBasedOnRatings(exerciseDetails, nextWeekExerciseDetails.sets);
                    }
                };
            });
        });
    }

    return updatedMesocycle;
};

const getBaseWeight = (mesocycle, weekIndex, day, exerciseDetails) => {

    return weekIndex === 0
            ? exerciseDetails.weight
            : mesocycle.weeks[0].days
                .find(d => d.title === day.title).exerciseDetails
                .find(details => details.name === exerciseDetails.name).weight;
};

const calculateNewWeight = (baseWeight, weekIndex) => {

    const weightMultiplier = {
        1: 1.025,
        2: 1.05,
        3: 1.075,
        4: 1.1
    };

    const multiplier = weightMultiplier[weekIndex] || 1;

    return Math.round(baseWeight * multiplier / 5) * 5;
};

const updateSetsBasedOnRatings = (currentExercise, currentSets) => {

    let newSets = Number(currentSets);

    newSets = Number(currentExercise.sorenessRating) + Number(currentExercise.pumpRating) + Number(currentExercise.sets)

    if( newSets <= 1 ){ return 1;} else { return Number(newSets); }

};


export { applyProgressiveOverload, getBaseWeight, calculateNewWeight, updateSetsBasedOnRatings };
