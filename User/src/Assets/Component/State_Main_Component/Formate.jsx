import React from "react";

const Formate = ({ state_description }) => {
  const parseDescription = (description) => {
    if (!description || typeof description !== "string") {
      return [<p key="0">No description provided.</p>];
    }

    const formattedDescription = description
      .replace(/[@]/g, "Title ") // Replace `@` with `Title`
      .replace(/[*•]/g, "Title") // Replace bullet symbols with `Title`
      .replace(/#\s?/g, "Main ") // Replace `#` with `Main`
      .replace(/\/\s?/g, "Submain ") // Replace `/` with `Submain`)
      .replace(/\n\s*\n/g, "\nDescription\n"); // Replace multiple newlines with `Description`

    const lines = formattedDescription.split("\n");

    return lines.map((line, index) => {
      if (line.startsWith("Title")) {
        return (
          <h1 key={index} style={{ fontSize: "24px", marginBottom: "10px" }}>
            {line.replace("Title", "").trim()}
          </h1>
        );
      } else if (line.startsWith("Main")) {
        return (
          <h2 key={index} style={{ fontSize: "20px", marginBottom: "8px" }}>
            {line.replace("Main", "").trim()}
          </h2>
        );
      } else if (line.startsWith("Submain")) {
        return (
          <h3 key={index} style={{ fontSize: "18px", marginBottom: "6px" }}>
            {line.replace("Submain", "").trim()}
          </h3>
        );
      } else if (line.startsWith("Description")) {
        return (
          <p key={index} style={{ fontSize: "16px", marginBottom: "6px" }}>
            {line.replace("Description", "").trim()}
          </p>
        );
      } else {
        return (
          <p key={index} style={{ fontSize: "16px", marginBottom: "4px" }}>
            {line.trim()}
          </p>
        );
      }
    });
  };

  const elements = parseDescription(state_description);

  return (
    <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", fontFamily: "Arial, sans-serif", padding: "10px" }}>
      {elements}
    </div>
  );
};

export default Formate;













      // const Formate = ({ state_description }) => {
      //     // Process the description
      //     const formattedDescription = state_description
      //       .replace(/[@]/g, "") // Remove @ for titles
      //       .replace(/[*•]/g, "Title") // Remove all bullet symbols
      //       .replace(/#\s?/g, "\n\nMain ") // Format main sections as headers
      //       .replace(/\/\s?/g, "\n- Submain") // Format subpoints as sub-list items
      //       .replace(/\n\s*\n/g, "\n\n Description"); // Ensure consistent spacing
        
      //     return (
      //       <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6", fontFamily: "Arial, sans-serif" }}>
      //         {formattedDescription}
      //       </div>
      //     );
      //   };
        
      //   export default Formate;
        