'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { PhotoList } from '../../src/components/PhotoList'

const photosMock = [
  {
    _id: '33dda00f0eec15bc3b3c59a615001ac8',
    dir_id: '22545465ezfzef4664686446648684',
    created_at: '0001-01-01T00:00:00Z',
    name: 'MonImage.jpg',
    size: '150000',
    updated_at: '0001-01-01T00:00:00Z'
  }
]

describe('PhotoList component', () => {
  it('should render correctly a timeline of photos according a photos array', () => {
    const component = shallow(
      <PhotoList title='Photo list title' photos={photosMock} selected={[]} />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should render correctly an empty view if photos is empty', () => {
    const component = shallow(
      <PhotoList title='Empty list' photos={[]} selected={[]} />
    ).node
    expect(component).toMatchSnapshot()
  })
})
