import React from 'react';
import '../global.scss';
import Deck from './Deck';
import Card from '../Card/Card';
import Cube from '../Cube/Cube';
import StateDecorator, { ClickDecorator } from '../StateDecorator/StateDecorator';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';


storiesOf('Containers.Deck', module)
  .add('with cards',
    withNotes('try clicking on the odd numbered Cards')(
      () => {
        const FlippingCard = StateDecorator('flipped', [true, false], 2500)(Card);
        const ClickingCard = ClickDecorator('flipped', [false, true])(Card);
        return (
          <Deck>
            <ClickingCard>
              <div>This is some content Front</div>
              <div>This is some content Back</div>
            </ClickingCard>
            <FlippingCard>
              <div>This is some content Front</div>
              <div>This is some content Back</div>
            </FlippingCard>
            <ClickingCard>
              <div>This is some content Front</div>
              <div>This is some content Back</div>
            </ClickingCard>
            <FlippingCard>
              <div>This is some content Front</div>
              <div>This is some content Back</div>
            </FlippingCard>
          </Deck>
        )
      }
    )
  )
  .add('with cubes',
    withNotes('try clicking on the odd numbered Cubes')(
      () => {
        const FlippingCube = StateDecorator('face', Cube.Faces, 2500)(Cube);
        const ClickingCube = ClickDecorator('face', Cube.Faces)(Cube);
        const faces = [
          (<span key={1}>1</span>),
          (<span key={2}>2</span>),
          (<span key={3}>3</span>),
          (<span key={4}>4</span>),
          (<span key={5}>5</span>),
          (<span key={6}>6</span>)
        ]
        return (
          <Deck>
            <ClickingCube>{faces}</ClickingCube>
            <FlippingCube>{faces}</FlippingCube>
            <ClickingCube>{faces}</ClickingCube>
            <FlippingCube>{faces}</FlippingCube>
            <ClickingCube>{faces}</ClickingCube>
            <FlippingCube>{faces}</FlippingCube>
          </Deck>
        )
      }
    )
  )
;
/*
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

 */