import styles from '../styles/photoList'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import { togglePhotoSelection } from '../actions/selection'
import { mustShowSelectionBar } from '../reducers'

import Empty from '../components/Empty'
import Loading from '../components/Loading'
import SelectionBar from './SelectionBar'
import PhotoList from '../components/PhotoList'
import AddToAlbumModal from '../containers/AddToAlbumModal'

export class PhotoBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      photoLists: []
    }

    this.fetchPhotoLists(props)
  }

  componentWillReceiveProps (nextProps, nextState) {
    if (!this.state.isFetching && nextProps.refetch) {
      this.fetchPhotoLists(nextProps)
    }
  }

  fetchPhotoLists (props) {
    props.fetchPhotoLists().then(photoLists => {
      this.setState({
        isFetching: false,
        photoLists: photoLists
      })
    })
  }

  render () {
    const { showSelection, selected, showAddToAlbumModal, onPhotoToggle } = this.props
    const { isFetching, isWorking, isIndexing } = this.props
    const { photoLists } = this.state
    const isBusy = isFetching || isWorking || isIndexing
    return (
      <div
        role='contentinfo'
        className={showSelection ? styles['pho-list-selection'] : ''}
      >
        { isIndexing &&
          <Loading loadingType='photos_indexing' />
        }
        { isFetching &&
          <Loading loadingType='photos_fetching' />
        }
        { isWorking &&
          <Loading loadingType='photos_upload' />
        }
        { showAddToAlbumModal &&
          <AddToAlbumModal />
        }
        {showSelection && <SelectionBar />}
        {!isBusy && photoLists.map(photoList => {
          return (<PhotoList
            key={photoList.title}
            title={photoList.title}
            photos={photoList.photos}
            selected={selected}
            onPhotoToggle={onPhotoToggle}
          />)
        })}
        {!isBusy && photoLists.length === 0 && <Empty emptyType='photos' />}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.ui.isFetching,
  isIndexing: state.ui.isIndexing,
  isWorking: state.ui.isWorking,
  selected: state.ui.selected,
  showSelection: mustShowSelectionBar(state),
  showAddToAlbumModal: state.ui.showAddToAlbumModal
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPhotoToggle: (id, selected) => {
    dispatch(togglePhotoSelection(id, selected))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(PhotoBoard))
