'use strict'

/* eslint-env jest */

// Specifying mock directly, manual mocks in __mocks__ subfolder, as described
// in https://facebook.github.io/jest/docs/manual-mocks.html seems to not
// work properly.
jest.mock('cozy-ui/react/Modal', () => {})

import React from 'react'
import { shallow } from 'enzyme'

import { mockT, mockF } from '../lib/I18n'
import { PhotoBoard } from '../../src/containers/PhotoBoard'

const mockFetchedPhotos = [{
  title: '2017-01-01',
  photos: [
    {
      _id: '33dda00f0eec15bc3b3c59a615001ac8',
      dir_id: '22545465ezfzef4664686446648684',
      created_at: '0001-01-01T00:00:00Z',
      name: 'MonImage.jpg',
      size: '150000',
      updated_at: '0001-01-01T00:00:00Z'
    }
  ]
}]

describe('PhotoBoard component', () => {
  it('should render correctly a timeline of photos according a photos array', () => {
    const component = shallow(
      <PhotoBoard t={mockT} f={mockF} fetchPhotoLists={() => Promise.resolve(mockFetchedPhotos)} selected={[]} />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should render correctly a loading view if isIndexing is true', () => {
    const component = shallow(
      <PhotoBoard t={mockT} f={mockF} fetchPhotoLists={() => Promise.resolve(mockFetchedPhotos)} selected={[]} isIndexing />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should render correctly a loading view if isFetching is true', () => {
    const component = shallow(
      <PhotoBoard t={mockT} f={mockF} fetchPhotoLists={() => Promise.resolve(mockFetchedPhotos)} selected={[]} isFetching />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should render correctly a loading view if isWorking is true', () => {
    const component = shallow(
      <PhotoBoard t={mockT} f={mockF} fetchPhotoLists={() => Promise.resolve(mockFetchedPhotos)} selected={[]} isWorking />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should render correctly a loading view if isFirstFetch is true', () => {
    const component = shallow(
      <PhotoBoard t={mockT} f={mockF} fetchPhotoLists={() => Promise.resolve(mockFetchedPhotos)} selected={[]} isFirstFetch />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should render correctly an empty view if photos is empty', () => {
    const component = shallow(
      <PhotoBoard t={mockT} f={mockF} fetchPhotoLists={() => Promise.resolve([])} selected={[]} />
    ).node
    expect(component).toMatchSnapshot()
  })
})
