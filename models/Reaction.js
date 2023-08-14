// Import the Schema object from mongoose.
const { Schema } = require('mongoose');

// Define the schema for reactions.
const reactionSchema = new Schema(
    {
        // Define the unique ID for the reaction with a default value.
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(), // Default to a new unique ObjectId.
        },
        
        // Define the content of the reaction with a maximum length constraint.
        reactionBody: {
            type: String,
            required: true, 
            maxlength: 280, // Ensure the reaction content doesn't exceed 280 characters.
        },
        
        // Specify the username associated with the reaction.
        username: {
            type: String,
            required: true,
        },
        
        // Define the creation date of the reaction with a default value and a getter for formatting.
        createdAt: {
            type: Date,
            default: Date.now, // Default to the current date and time.
            get: (date) => {
                // Convert the date to a more user-friendly format.
                return date.toLocaleDateString();
            },
        }
    }
);

// Export the reaction schema for use in other parts of the application.
module.exports = { reactionSchema }
