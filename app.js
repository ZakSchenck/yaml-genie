import yaml from 'https://cdn.skypack.dev/js-yaml';
const resultTextArea = document.querySelector('#result');
const inputText = document.querySelector('#input-text');

// Checks if input value is empty, if so throw an error
const checkInputValue = () => {
    resultTextArea.value = 'Please add a non-null value to your input';
    resultTextArea.style.color = 'red';
}

// Event listener for adding dashes to lines on a YAML file
document.querySelector('#dashify-btn')?.addEventListener('click', () => {
    if (editor.getValue().trim() === '') {
        checkInputValue();
        return;
    }

    resultTextArea.style.color = 'black';
    // Split each value by its new line
    const newLines = editor.getValue().split('\n');
    // Add a dashed line for each line
    const dashedLines = newLines.map(line => `- ${line}`);

    resultTextArea.value = dashedLines.join('\n');
});

// Event listener for checking for syntax errors in a YAML file
document.querySelector('#syntax-btn')?.addEventListener('click', () => {
    if (editor.getValue().trim() === '') {
        checkInputValue();
        return;
    }
    try {
        const content = yaml.load(editor.getValue());
        console.log('YAML content:', content);

        resultTextArea.value = 'YAML Syntax is valid and usable'
        resultTextArea.style.color = 'green';
    } catch (e) {
        console.error('Failed to parse YAML:', e);
        resultTextArea.value = `${e.name}\n${e.message}`;
        resultTextArea.style.color = 'red'
    }
});

// Clear button for clearing both textareas
document.querySelector('#clear')?.addEventListener('click', () => {
    resultTextArea.value = '';
    editor.getValue() = '';
});

// Logic for converting yaml into json
document.querySelector('#json-btn')?.addEventListener('click', () => {
    if (editor.getValue().trim() === '') {
        checkInputValue();
        return;
    }

    try {
        // Parse the YAML string into a JavaScript object
        const obj = yaml.load(editor.getValue());

        // Convert tobject to JSON string
        const jsonString = JSON.stringify(obj, null, 2);

        resultTextArea.value = jsonString
    } catch (e) {
        console.error('Failed to convert YAML to JSON:', e);
        return null;
    }
});

document.querySelector('#copy-btn')?.addEventListener('click', () => {
    resultTextArea.select();
    resultTextArea.setSelectionRange(0, 99999);
  
    navigator.clipboard.writeText(resultTextArea.value);
  
    alert("YAML text copied.");
})

document.querySelector('#format-btn')?.addEventListener('click', () => {
    try {
        const formattedContent = yaml.dump(yaml.load(editor.getValue()));
        resultTextArea.value = formattedContent;
        resultTextArea.style.color = 'black';
    } catch (e) {
        console.error('Failed to format YAML:', e);
        resultTextArea.value = 'Failed to format YAML. Syntax contains an error.';
        resultTextArea.style.color = 'red';
    }
});

const editor = CodeMirror(document.getElementById('codeEditor'), {
    value: "# Your initial YAML here\n",
    mode:  "yaml",
    theme: "default",
    lineNumbers: true, 
  });