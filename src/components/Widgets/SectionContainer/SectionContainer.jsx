import './SectionContainer.css';

const SectionContainer = ({ parent, children, mods }) => {
  const modHelper = () => {
    if (Array.isArray(mods)) {
      return mods.join(' ');
    }
    return mods;
  };

  return (
    <div className={`${parent}__wrapper wrapper ${modHelper()}`}>
      {children}
    </div>
  );
};

export default SectionContainer;
