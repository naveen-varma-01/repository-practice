// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {isActive, details, setActiveId} = props
  const {id, language} = details
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickLanguageFilter = () => {
    setActiveId(id)
  }

  return (
    <li>
      <button
        className={btnClassName}
        onClick={onClickLanguageFilter}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
