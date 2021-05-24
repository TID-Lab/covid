import { useDispatch } from 'react-redux';

import './index.css';

import Source from '../Source';

const SOURCES_TYPE = {
  'type-all': 'All',
  'type-institutional': 'Institutional',
  'type-non-institutional': 'Non-institutional'
}

const SOURCES_LOCATION = {
  'loc-all': 'All',
  'loc-georgia': 'Georgia',
  'loc-non-georgia': 'Non-Georgia'
}

const SOURCES_CATEGORY = {
  'cat-all': 'All',
  'cat-government': 'Government',
  'cat-media': 'Media',
  'cat-faith': 'Faith',
  'cat-health': 'Health',
  'cat-covid': 'COVID-19',
  'cat-diabetes': 'Diabetes'
}

const SourceFilter = (props) => {
  const { source } = props;
  const dispatch = useDispatch();

  function onSelected(id) {
    return () => {
      dispatch({ type: 'source/set', payload: id });
    }
  }

  return (
    <div className='Filter Sources'>
      <h3>Account Filters</h3>
      <h4>Type of Account</h4>
      {Object.keys(SOURCES_TYPE).map(id => (
        <Source key={id} id={id} name={SOURCES_TYPE[id]} selected={id === source} onSelected={onSelected(id)}/>
      ))}
      <h4>Account Location</h4>
      {Object.keys(SOURCES_LOCATION).map(id => (
        <Source key={id} id={id} name={SOURCES_LOCATION[id]} selected={id === source} onSelected={onSelected(id)}/>
      ))}
      <h4>Account Category</h4>
      {Object.keys(SOURCES_CATEGORY).map(id => (
        <Source key={id} id={id} name={SOURCES_CATEGORY[id]} selected={id === source} onSelected={onSelected(id)}/>
      ))}
    </div>
  );
};

// const SourceFilter = (props) => {
//   const { sources } = props;
//   const dispatch = useDispatch();

//   function onToggled(value) {
//     return (toggled) => {
//       if (!toggled) {
//         dispatch({ type: 'sources/added', payload: value });
//       } else {
//         dispatch({ type: 'sources/removed', payload: value });
//       }
//     }
//   }

//   console.log(sources);

//   return (
//     <div className='Filter Sources'>
//       <h3>Account Filters</h3>
//       <h4>Type of Account</h4>
//       <Toggle name='Official only' value='official-only' toggled={sources.includes('official-only')} onToggled={onToggled('official-only')} />
//       <section>
//         <Toggle name='Government' value='government' toggled={sources.includes('government')} onToggled={onToggled('government')} />
//         <Toggle name='Media' value='media' toggled={sources.includes('media')} onToggled={onToggled('media')} />
//         <Toggle name='Health' value='health' toggled={sources.includes('health')} onToggled={onToggled('health')} />
//       </section>
//       <Toggle name='Non-official only' value='non-official-only' toggled={sources.includes('non-official-only')} onToggled={onToggled('non-official-only')} />
//       <Toggle name='Georgia only' value='georgia-only'toggled={sources.includes('georgia-only')}  onToggled={onToggled('georgia-only')} />
//       <Toggle name='Health only' value='health-only' toggled={sources.includes('health-only')} onToggled={onToggled('health-only')} />
//       <section>
//         <Toggle name='Diabetes' value='diabetes' toggled={sources.includes('diabetes')} onToggled={onToggled('diabetes')} />
//       </section>
//     </div>
//   );
// };

export default SourceFilter;