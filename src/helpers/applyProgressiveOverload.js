const applyProgressiveOverload = (mesocycle, startWeekIndex) => {

    const updatedMesocycle = JSON.parse(JSON.stringify(mesocycle));
    //console.log("Copied mesocycle being modified: ", JSON.stringify(updatedMesocycle, null, 2));  

    for (let weekIndex = startWeekIndex; weekIndex < updatedMesocycle.weeks.length; weekIndex++) {
        
        if(weekIndex > startWeekIndex){

            updatedMesocycle.weeks[weekIndex].days.forEach((day, dayIndex) => {

                day.muscleGroups.forEach((muscleGroup, groupIndex) => {

                    const previousWeekMuscleGroup = updatedMesocycle.weeks[weekIndex - 1].days[dayIndex].muscleGroups[groupIndex];
                    muscleGroup.weight = calculateNewWeight(previousWeekMuscleGroup.weight);
                    muscleGroup.sets = calculateNewSets(previousWeekMuscleGroup.sets);                   
          
                });
            });
        }

    }
    //console.log("updatedMesocycle being retrned: ", JSON.stringify(updatedMesocycle, null, 2));
    return updatedMesocycle;
  };
  
  const calculateNewWeight = (previousWeight) => { 
    return Number(previousWeight) + 5;
  };
  
  const calculateNewSets = (previousSets) => {
    return previousSets + 1;
  };

export default applyProgressiveOverload;
  