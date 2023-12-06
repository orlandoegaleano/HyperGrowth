//Mesocycle model
const mongoose = require('mongoose');

const mesocycleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  weeks: [
    {
      days: [
        {
          title: String,
          id: Number,
          muscleGroups: [
            {
              muscle: String,              
              name: String,
              link: String,
              weight: Number,
              sets: Number,
              repCounts: [Number],
                              
            },
          ],
        },
      ],
    },
  ],
});

mongoose.model('Mesocycle', mesocycleSchema);
