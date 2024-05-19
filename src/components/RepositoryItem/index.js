// Write your code here
import './index.css'
const RepositoryItem = props => {
  const {details} = props
  const {name, issuesCount, starsCount, forksCount, avatarUrl} = details
  return (
    <li className="list">
      <img src={avatarUrl} className="avatar" />
      <h1 className="pink">{name}</h1>
      <div className="img-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="para">{starsCount} stars</p>
      </div>
      <div className="img-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="para">{forksCount} forks</p>
      </div>
      <div className="img-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
