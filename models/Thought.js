// Import necessary modules from mongoose.
const { Schema, model } = require('mongoose');

// Import the reaction schema for embedding within the thought schema.
const { reactionSchema } = require('./Reaction');

// Define the schema for thoughts.
const thoughtSchema = new Schema(
    {
        // Define the text of the thought with constraints.
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280, // Maximum length is set to 280 characters.
        },
        
        // Define the creation date with a default value and a getter for formatting.
        createdAt: {
            type: Date,
            default: Date.now, // Default to the current date and time.
            get: (date) => {
                // Format the date to a more readable format.
                return date.toLocaleDateString();
            },
        },
        
        // Define the username associated with the thought.
        username: {
            type: String, 
            required: true,
        },
        
        // Embed the reactions using the reaction schema.
        reactions: [reactionSchema]
    },
    {
        timestamps: true, // Include timestamps for createdAt and updatedAt.
        toJSON: { virtuals: true }, // Include virtuals when document is converted to JSON.
        id: false, // Don't include the default virtual id.
    }
);

// Create a virtual property to retrieve the number of reactions for a thought.
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Create the Thought model using the defined schema.
const Thought = model('thought', thoughtSchema);

// Export the Thought model for use in other parts of the application.
module.exports = Thought;
