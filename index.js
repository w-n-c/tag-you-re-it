/************ COLLAPSIBLE LIST UI SECTION ************/
// Source: https://inclusive-components.design/collapsible-sections/
// generates the toggle drawers for todo list items
{
    // Get list headings
    const headings = document.querySelectorAll('main section h2')
    
    Array.prototype.forEach.call(headings, heading => {
        // Give each <h2> a toggle button child
        // with the SVG plus/minus icon
        heading.innerHTML = `
        <button aria-expanded="false">
            <input type="checkbox" id="UUID-1">
            <label for="UUID-1">${heading.textContent}</label>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
            <rect class="vert" height="8" width="2" y="1" x="4"/>
            <rect height="2" width="8" y="4" x="1"/>
            </svg>
        </button>
        `
        
        // Function to create a node list 
        // of the content between this <h2> and the next
        const getContent = (elem) => {
            let elems = []
            while (elem.nextElementSibling && elem.nextElementSibling.tagName !== 'H2') {
                elems.push(elem.nextElementSibling)
                elem = elem.nextElementSibling
            }
            
            // Delete the old versions of the content nodes
            elems.forEach((node) => {
                node.parentNode.removeChild(node)
            })
        
            return elems
        }
        
        // Assign the contents to be expanded/collapsed (array)
        let contents = getContent(heading)
        
        // Create a wrapper element for `contents` and hide it
        let wrapper = document.createElement('div')
        wrapper.hidden = true
        
        // Add each element of `contents` to `wrapper`
        contents.forEach(node => {
        wrapper.appendChild(node)
        })
        
        // Add the wrapped content back into the DOM 
        // after the heading
        heading.parentNode.insertBefore(wrapper, heading.nextElementSibling)
        
        // Assign the button
        let btn = heading.querySelector('button')
        
        btn.onclick = () => {
        // Cast the state as a boolean
        let expanded = btn.getAttribute('aria-expanded') === 'true' || false
        
        // Switch the state
        btn.setAttribute('aria-expanded', !expanded)
        // Switch the content's visibility
        wrapper.hidden = expanded    
        }
    })
}

/************ TODO UI SECTION ************/
// source: https://inclusive-components.design/a-todo-list/
// respsonsible for changes to a todo item's state
{
    const todoName = document.querySelector('[type="text"]').value;
    const liveRegion = document.querySelector('[role="status"]');
    function addedFeedback(todoName) {
        liveRegion.textContent = `${todoName} added.`;
    }
    addedFeedback(todoName);

    function deletedFeedback(todoName) {
        liveRegion.textContent = `${todoName} deleted.`;
    }
}


/************ DATA SECTION ************/
function generateUUID() {
    let d = Date.now()
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const data = {
    "data": {
        "type": "list",
        "id": "UUID-1",
        "attribtues": {
            "title": "",
            "items": [
                {
                    "data": {
                        "type": "item",
                        "id": "UUID-2",
                        "attributes": { "text": "Make JSON API" }
                    }
                },
                {
                    "data": {
                        "type": "item",
                        "id": "UUID-3",
                        "attributes": { "text": "Make Example" }
                    }
                },
                {
                    "data": {
                        "type": "list",
                        "id": "UUID-4",
                        "attributes": {
                            "title": "sub-list",
                            "items": [
                                {
                                    "data": {
                                        "type": "item",
                                        "id": "UUID-5",
                                        "attributes": { "text": "write recursive parser" }
                                    }
                                },
                                {
                                    "data": {
                                        "type": "item",
                                        "id": "UUID-6",
                                        "attributes": { "text": "finish todolist UI" }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
}