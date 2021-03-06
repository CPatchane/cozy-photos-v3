import styles from '../styles/photoList'

import React, { Component } from 'react'
import classNames from 'classnames'
import { Link, withRouter } from 'react-router'

import { getPhotoLink } from '../actions/photos'

export class Photo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      isImageLoading: true
    }
    getPhotoLink(props.photo._id)
      .then(link => this.setState({
        url: link,
        loading: false
      }))

    this.handleImageLoaded = this.handleImageLoaded.bind(this)
  }

  handleImageLoaded () {
    this.setState({ isImageLoading: false })
  }

  render () {
    const { photo, selected = false, onToggle, router } = this.props
    const { loading, url, isImageLoading } = this.state
    const parentPath = router.location.pathname
    return (
      !loading &&
        <div className={classNames(
          styles['pho-photo'],
          { [styles['pho-photo--selected']]: selected }
        )}>
          <span
            className={styles['pho-photo-select']}
            data-input='checkbox'
            onClick={e => {
              e.stopImmediatePropagation()
              onToggle(photo._id, selected)
            }}>
            <input
              type='checkbox'
              checked={selected}
             />
            <label />
          </span>
          <Link to={`${parentPath}/${photo._id}`}>
            <img
              className={styles['pho-photo-item']}
              onLoad={this.handleImageLoaded}
              style={isImageLoading ? 'display:none' : ''}
              alt={photo.name}
              src={url}
            />
          </Link>
        </div>
    )
  }
}

export default withRouter(Photo)
