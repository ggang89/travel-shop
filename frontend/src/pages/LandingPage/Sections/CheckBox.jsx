const CheckBox = ({ continents, checkedContinents, onFilters }) => {
  const handleToggle = (continentId) => {
    // 현재 누른 체크박스가 이미 누른 체크박스인지 확인
    const currentIndex = checkedContinents.indexOf(continentId);

    const filters = [...checkedContinents];

    if (currentIndex === -1) {
      filters.push(continentId);
    } else {
      filters.splice(currentIndex, 1);
    }
    onFilters(filters); 
  };

  return (
    <div className="p-2 mb-3 bg-gray-100 rounded-md">
      {continents?.map((continent) => (
        <div key={continent.id}>
          <input type="checkbox" onChange={() => handleToggle(continent._id)} />
          {" "}
          <label>{continent.name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
