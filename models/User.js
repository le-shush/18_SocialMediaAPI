const { Schema, model } = require('mongoose');

// Import the unique validator to ensure unique fields in the database.
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema for the user.
const userSchema = new Schema(
    {
        // Define the username field with properties.
        username: { type: String, required: true, unique: true, trim: true },
        
        // Define the email field with properties and validation.
        email: { 
            type: String, 
            required: [true, "Email required"], 
            unique: true, 
            validate: {
                // Use a regex pattern to validate email since mongoose doesn't have a built-in validator.
                validator: function (v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
                },
                message: 'Please enter a valid email'
            },
        },
        
        // Array to store references to user's thoughts.
        thoughts: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'thought'
        }],
        
        // Array to store references to user's friends.
        friends: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }]
    },
    {
        // Configuration to include virtuals when the document is converted to JSON.
        toJSON: { virtuals: true },
        id: false, 
    },
);

// Create a virtual property to retrieve the count of friends for a user.
userSchema
    .virtual('friendsCount')
    .get(function () {
        return this.friends.length;
    });

// Attach the uniqueValidator plugin to the userSchema to ensure unique fields.
userSchema.plugin(uniqueValidator);

// Create the User model using the defined schema.
const User = model('user', userSchema);

// Export the User model.
module.exports = User;
