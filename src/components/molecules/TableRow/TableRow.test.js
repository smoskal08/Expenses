import { render, screen } from 'test-utils'
import TableRow from './TableRow'

describe('Table Row', () => {
  it('Renders the component', async () => {
    render(<table><tbody><TableRow id={1} day="2021-12-08" price="25" place="Tesco" category={2} priority={3} /></tbody></table>)

    await screen.findByText('Tesco')
  })
})