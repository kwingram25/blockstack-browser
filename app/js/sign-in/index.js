import React from 'react'
import PropTypes from 'prop-types'
import PanelShell, { renderItems } from '@components/PanelShell'
import { EnterSeed, MagicLink, Options } from './views'

const VIEWS = {
  INDEX: 0,
  MAGIC_LINK: 1,
  ENTER_SEED: 2,
  LOCAL_SEED: 3
}

class Onboarding extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
    seed: '',
    view: VIEWS.INDEX
  }

  updateValue = (key, value) => {
    this.setState({ [key]: value })
  }

  updateView = view => this.setState({ view })

  render() {
    const { view } = this.state

    const views = [
      {
        show: VIEWS.INDEX,
        Component: Options,
        props: {
          options: [
            {
              title: 'Magic Link',
              description:
                'You’ll need your password (the password you entered when the link was created).',
              action: () => this.updateView(VIEWS.MAGIC_LINK)
            },
            {
              title: 'Secret Recovery Key',
              description:
                'You’ll need your Secret Recovery Key (the 12 words' +
                ' you wrote down on paper and then saved in a secret place).',
              action: () => this.updateView(VIEWS.ENTER_SEED)
            }
          ]
        }
      },
      {
        show: VIEWS.MAGIC_LINK,
        Component: MagicLink,
        props: {
          previous: () => this.updateView(VIEWS.INDEX)
        }
      },
      {
        show: VIEWS.ENTER_SEED,
        Component: EnterSeed,
        props: {
          previous: () => this.updateView(VIEWS.INDEX)
        }
      }
    ]

    return <PanelShell>{renderItems(views, view)}</PanelShell>
  }
}

Onboarding.propTypes = {
  location: PropTypes.object
}

export default Onboarding