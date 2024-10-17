document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('add');
    const input = document.getElementById('card-input');
    const mode = document.getElementsByClassName('mode')[0];
    const body = document.body;
    const main = document.getElementsByClassName('main')[0];
    const card = document.getElementsByClassName('card')[0];
    const newCard = document.getElementById('new-card');

    const addTask = (taskContainer, inputField) => {
        const value = inputField.value;
        if (value) {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-item');

            const newCheckbox = document.createElement('input');
            newCheckbox.type = "checkbox";
            newCheckbox.classList.add('task');

            const newLabel = document.createElement('label');
            newLabel.textContent = value;
            newLabel.classList.add('task-label');

            newCheckbox.addEventListener('change', () => {
                if (newCheckbox.checked) {
                    newLabel.style.textDecoration = 'line-through';
                    taskContainer.appendChild(taskDiv);
                } else {
                    newLabel.style.textDecoration = 'none';
                    const uncheckedTasks = Array.from(taskContainer.children).filter(task => {
                        const checkbox = task.querySelector('.task');
                        return checkbox && !checkbox.checked;
                    });
                    if (uncheckedTasks.length > 0) {
                        taskContainer.insertBefore(taskDiv, uncheckedTasks[0]);
                    } else {
                        taskContainer.insertBefore(taskDiv, taskContainer.firstChild);
                    }
                }
            });

            taskDiv.appendChild(newCheckbox);
            taskDiv.appendChild(newLabel);

            taskContainer.insertBefore(taskDiv, taskContainer.firstChild);
            inputField.value = '';
        }
    };
    button.addEventListener('click', () => addTask(document.getElementById('tasks'), input));
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask(document.getElementById('tasks'), input);
        }
    });

    newCard.addEventListener('click', () => {
        const clonedCard = card.cloneNode(true);

        const clonedTitle = clonedCard.querySelector('.card-title');
        if (clonedTitle) {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = 'Введите название';
            newInput.classList.add('card-title');

            clonedTitle.replaceWith(newInput);

            newInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const newTitle = document.createElement('div');
                    newTitle.textContent = newInput.value || 'Введите название';
                    newTitle.classList.add('card-title');
                    newInput.replaceWith(newTitle);

                    newTitle.addEventListener('click', () => {
                        newInput.value = newTitle.textContent;
                        newTitle.replaceWith(newInput);
                    });
                }
            });
        }

        const clonedTasks = clonedCard.querySelector('#tasks');
        if (clonedTasks) clonedTasks.innerHTML = '';

        const lastCard = main.querySelector('.card:last-child');
        main.insertBefore(clonedCard, lastCard);

        const addTaskButton = clonedCard.querySelector('#add');
        const clonedInputField = clonedCard.querySelector('#card-input');

        addTaskButton.addEventListener('click', () => addTask(clonedTasks, clonedInputField));

        clonedInputField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                addTask(clonedTasks, clonedInputField);
            }
        });
    });

    mode.addEventListener('click', () => {
        if (body.classList.contains('lite-mode')) {
            body.classList.remove('lite-mode');
            body.classList.add('dark-mode');
            mode.textContent = 'TO LITE';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('lite-mode');
            mode.textContent = 'TO DARK';
        }
    });
});
