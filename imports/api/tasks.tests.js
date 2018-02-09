import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Tasks } from './tasks.js';

if (Meteor.isServer){
    describe('Tasks',() => {
        describe('methods',() => {
            const userId = Random.id();
            let taskid;

            beforeEach(() => {
                Tasks.remove({});
                taskid = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday'
                });
            });
            it('can delete owned task', () => {
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                const invocation = { userId };

                deleteTask.apply(invocation, [taskId]);
                assert.equal(Tasks.find().count(), 0);
            });
        });
    });
}