export function renderTitle(title, defaultElement, defaultHighlightWord) {
  if (!title) return defaultElement;

  if (title.includes('*')) {
    const parts = title.split(/(\*[^*]+\*)/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('*') && part.endsWith('*')) {
            return (
              <span key={i} className="highlight-sharp-blue-box">
                {part.slice(1, -1)}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  }

  if (defaultHighlightWord) {
    const regex = new RegExp(`(${defaultHighlightWord})`, 'gi');
    const parts = title.split(regex);
    if (parts.length > 1) {
      return (
        <>
          {parts.map((part, i) =>
            part.toLowerCase() === defaultHighlightWord.toLowerCase() ? (
              <span key={i} className="highlight-sharp-blue-box">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </>
      );
    }
  }

  return title;
}

