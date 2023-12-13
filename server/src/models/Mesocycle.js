//Mesocycle model
const mongoose = require('mongoose');

const mesocycleSchema = new mongoose.Schema({

  mesocycleTitle: String, 
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
          exerciseDetails: [
            {
              muscle: String,              
              name: String,
              weight: Number,
              sets: Number,
              repCounts: [Number],
              baseWeight: Number,
              sorenessRating: Number,
              pumpRating: Number
                              
            },
          ],
        },
      ],
    },
  ],
});

mongoose.model('Mesocycle', mesocycleSchema);
