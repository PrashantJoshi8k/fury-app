// FileImporter.js
import React from 'react';
import PropTypes from 'prop-types';

export default function FileImporter({ onImport }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = function (e) {
                const text = e.target.result;
                onImport(text); // Pass the text back to parent
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a valid .txt file");
        }
    };

    return (
        <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">Import Text File</label>
            <input
                type="file"
                accept=".txt"
                className="form-control"
                id="fileInput"
                onChange={handleFileChange}
            />
        </div>
    );
}

FileImporter.propTypes = {
    onImport: PropTypes.func.isRequired,
};