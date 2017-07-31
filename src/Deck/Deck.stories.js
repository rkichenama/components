import React from 'react';
import '../global.scss';
import Deck from './Deck';
import Card from '../Card/Card';
import StateDecorator, { ClickDecorator } from '../StateDecorator/StateDecorator';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

const CardExample = StateDecorator('flipped', [true, false], 1000)(Card);
const Hiragana = ClickDecorator('flipped', [false, true])(Card);

storiesOf('Deck', module)
  .add('story',
    withInfo(null)(
      () => (
        <Deck>
          <Card>
            <div>This is some content Front</div>
            <div>This is some content Back</div>
          </Card>
          <CardExample>
            <div>This is some content Front</div>
            <div>This is some content Back</div>
          </CardExample>
          <Card>
            <div>This is some content Front</div>
            <div>This is some content Back</div>
          </Card>
          <CardExample>
            <div>This is some content Front</div>
            <div>This is some content Back</div>
          </CardExample>
          <Card>
            <div>This is some content Front</div>
            <div>This is some content Back</div>
          </Card>
          <CardExample>
          <div id="lipsum">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis augue sed est varius ultrices sit amet vel justo. Nunc nisi erat, consectetur sed lacus quis, laoreet sodales sapien. Praesent eu metus efficitur, pulvinar metus at, rutrum ipsum. Donec eget lacinia dui, eu elementum ligula. Donec consectetur et est eu laoreet. Donec porttitor, arcu ac semper faucibus, sapien mauris tristique nisl, quis posuere neque nibh a tortor. Donec ante ex, pharetra vel efficitur eu, elementum nec sapien. Sed scelerisque nisl quis bibendum blandit. Phasellus urna lorem, aliquam sit amet bibendum eu, tempor ac augue. Integer luctus iaculis dui. Proin diam neque, molestie non lacus ut, volutpat placerat risus. Morbi quis nibh porta, bibendum elit a, lacinia diam. Morbi non dui tellus. Cras nulla magna, rhoncus quis turpis at, volutpat iaculis neque. Praesent sed justo mattis nisi fringilla ullamcorper.
          </p>
          <p>
          Praesent maximus sed dui sed tempor. Sed quis blandit dolor. Praesent rhoncus sit amet ex ut vehicula. Fusce condimentum velit nec hendrerit convallis. Pellentesque arcu augue, lacinia quis ligula quis, eleifend varius ex. Cras venenatis quis eros ut auctor. Duis molestie turpis ac nulla fermentum, vel volutpat sapien bibendum. Quisque quis malesuada massa, a elementum justo. Morbi iaculis massa sed aliquet aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
          </p>
          <p>
          Nunc maximus mattis ex in malesuada. Mauris sollicitudin libero sit amet sapien lobortis tempus. Donec vitae ullamcorper dolor. Fusce ut quam elementum, lacinia diam eget, faucibus libero. Phasellus condimentum sem in aliquam ornare. Sed luctus volutpat libero eget gravida. Curabitur lobortis efficitur mi, non rutrum dui auctor vitae. Mauris mollis dui id ante molestie, sit amet pulvinar nisl aliquet. Aenean sit amet ultrices ex. Pellentesque ultricies tellus efficitur justo egestas bibendum. Phasellus auctor tincidunt urna ut sodales.
          </p></div>
            <div>Back</div>
          </CardExample>
        </Deck>
      )
    )
  )
  .add('hiragana', () => (
    <Deck>
      {
        [
          // Monographs
          [ "あ", "a [a]" ],
          [ "え", "e [e]" ],
          [ "い", "i [i]" ],
          [ "お", "o [o]" ],
          [ "う", "u [ɯ]" ],
          [ "か", "ka [ka]" ],
          [ "け", "ke [ke]" ],
          [ "き", "ki [kʲi]" ],
          [ "こ", "ko [ko]" ],
          [ "く", "ku [kɯ]" ],
          [ "さ", "sa [sa]" ],
          [ "せ", "se [se]" ],
          [ "し", "shi [ɕi]" ],
          [ "そ", "so [so]" ],
          [ "す", "su [sɯ]" ],
          [ "た", "ta [ta]" ],
          [ "て", "te [te]" ],
          [ "ち", "chi [ t͡ɕi]" ],
          [ "と", "to [to]" ],
          [ "つ", "tsu [ t͡sɯ]" ],
          [ "な", "na [na]" ],
          [ "ね", "ne [ne]" ],
          [ "に", "ni [ɲi]" ],
          [ "の", "no [no]" ],
          [ "ぬ", "nu [nɯ]" ],
          [ "は", "ha [ha]" ],
          [ "へ", "he [he]" ],
          [ "ひ", "hi [çi]" ],
          [ "ほ", "ho [ho]" ],
          [ "ふ", "fu [ɸɯ]" ],
          [ "ま", "ma [ma]" ],
          [ "め", "me [me]" ],
          [ "み", "mi [mi]" ],
          [ "も", "mo [mo]" ],
          [ "む", "mu [mɯ]" ],
          [ "や", "ya [ja]" ],
          [ "よ", "yo [jo]" ],
          [ "ゆ", "yu [jɯ]" ],
          [ "ら", "ra [ɾa]" ],
          [ "れ", "re [ɾe]" ],
          [ "り", "ri [ɾi]" ],
          [ "ろ", "ro [ɾo]" ],
          [ "る", "ru [ɾɯ]" ],
          [ "わ", "wa [wa]" ],
          [ "ゑ", "e/we [(w)e]" ],
          [ "ゐ", "i/wi [(w)i]" ],
          [ "を", "o/wo [(w)o]" ],
          [ "ん", "n [n] [m] [ŋ] before stop consonants; [ɴ] [ɯ̃] [ĩ] elsewhere" ],
        ].map(([j, e], i) => (
          <Hiragana key={i}>
            <div className='centered' style={{fontSize: '48px'}}>{j}</div>
            <div className='centered' style={{fontSize: '48px'}}>{e}</div>
          </Hiragana>
        ))
      }
    </Deck>
  ))
;
