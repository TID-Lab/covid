import { useDispatch } from 'react-redux';

import Radio from '../Radio';

import './index.css';

const CuratedToggle = (props) => {
  const { curatedOnly } = props;
  const dispatch = useDispatch();

  function onAllPlatformsSelected(e) {
    dispatch({ type: 'accounts/curatedOnly/set', payload: false })
  }

  function onCuratedOnlySelected(e) {
    dispatch({ type: 'accounts/curatedOnly/set', payload: true })
  }

  return (
    <div className='AccountFilter'>
      <Radio key={'all'} id={'all'} name='accountsCurated' value={'All-platform search'} selected={!curatedOnly} onSelected={onAllPlatformsSelected}/>
      <Radio key={'curatedOnly'} id={'curatedOnly'} name='accountsCurated' value={'Curated accounts'} selected={curatedOnly} onSelected={onCuratedOnlySelected}/>
    </div>
  );
}

export default CuratedToggle;