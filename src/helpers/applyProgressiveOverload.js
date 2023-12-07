const applyProgressiveOverload = (mesocycle) => {
  const updatedMesocycle = JSON.parse(JSON.stringify(mesocycle));

  for (let weekIndex = 0; weekIndex < updatedMesocycle.weeks.length; weekIndex++) {
      updatedMesocycle.weeks[weekIndex].days.forEach(day => {
          day.muscleGroups.forEach(muscleGroup => {
              const baseWeight = weekIndex === 0
                  ? muscleGroup.weight
                  : updatedMesocycle.weeks[0].days.find(d => d.title === day.title).muscleGroups.find(mg => mg.name === muscleGroup.name).weight;

              muscleGroup.weight = calculateNewWeight(baseWeight, weekIndex);
              muscleGroup.sets = calculateNewSets(muscleGroup.sets, weekIndex);
          });
      });
  }
  return updatedMesocycle;
};

const calculateNewWeight = (baseWeight, weekIndex) => {
  let multiplier;
  switch (weekIndex) {
      case 1:
          multiplier = 1.025;
          break;
      case 2:
          multiplier = 1.05;
          break;
      case 3:
          multiplier = 1.075;
          break;
      case 4:
          multiplier = 1.1;
          break;
      default:
          multiplier = 1; 
  }
  return Math.round(baseWeight * multiplier / 5) * 5;
};

const calculateNewSets = (initialSets, weekIndex) => {
  return initialSets + weekIndex;
};


export default applyProgressiveOverload;
