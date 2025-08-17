export const createNumericInputHandlers = (maxLength: number = 11) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight'];
    const isCtrlKey = e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase());
    const isNumber = /^[0-9]$/.test(e.key);
    const currentLength = e.currentTarget.value.length;
    
    // Prevent input if max length reached and it's a number
    if (isNumber && currentLength >= maxLength) {
      e.preventDefault();
      return;
    }
    
    if (!allowedKeys.includes(e.key) && !isCtrlKey && !isNumber) {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.replace(/[^0-9]/g, '');
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    e.currentTarget.value = value;
  };

  return {
    handleKeyDown,
    handleInput
  };
};