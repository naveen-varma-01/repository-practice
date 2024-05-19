import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    dataList: [],
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = ` https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        dataList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="image"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {dataList} = this.state
    return (
      <ul>
        {dataList.map(each => (
          <RepositoryItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveId = newFilterId => {
    this.setState({activeId: newFilterId}, this.getData)
  }

  renderLanguageFiltersList = () => {
    const {activeId} = this.state

    return (
      <ul>
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            isActive={each.id === activeId}
            details={each}
            setActiveId={this.setActiveId}
          />
        ))}
      </ul>
    )
  }
  render() {
    return (
      <div>
        <div>
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFiltersList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
