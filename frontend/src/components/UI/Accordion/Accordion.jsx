// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import classes from './Accordion.module.css';

const Accordion = ({ items }) => {
  const [activeIndexes, setActiveIndexes] = useState([0]);

  const handleItemClick = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <div className={classes.accordion}>
      {items.map((item, index) => (
        <div key={index}>
          <button
            className={classes.accordion__button}
            onClick={() => handleItemClick(index)}
            data-active={activeIndexes.includes(index)}
          >
            {item.title}
            <span data-icon="x"></span>
          </button>
          <div
            className={classes.accordion__panel}
            data-active={activeIndexes.includes(index)}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
