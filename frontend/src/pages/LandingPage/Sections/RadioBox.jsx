

const RadioBox = ({prices,checkedPrice,onFilters}) => {
  return (
    <div className="p-2 m-3 bg-gray-100 rounded-md">
      {prices?.map(price => (
        <div key={price._id}>
          <input
            checked={checkedPrice === price.array}
            onChange={e => onFilters(e.target.value)}
            type="radio"
            id={price._id}
            value={price.id}
          />
          {" "}
          <label htmlFor={price._id}>{price.name}</label>
        </div>
      ))}


    </div>
  )
}

export default RadioBox