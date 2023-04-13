import './styles.css';

const Dropdown = ({
  options,
  id,
  onSelectValue,
  selectValue,
  initialXValue,
}) => {
  const handleSelect = (e) => {
    onSelectValue(e.target.value);
  };

  return (
    <div>
      <select
        defaultValue={initialXValue}
        name='languages'
        id={id}
        onChange={(e) => handleSelect(e)}
      >
        {options.map(({ value, label }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span>{selectValue || initialXValue}</span>
    </div>
  );
};

export default Dropdown;
