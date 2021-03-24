'use strict';

const userNameInput = document.getElementById('user-name')
const assessmentButton = document.getElementById('assessment')
const resultDivided = document.getElementById('result-area')
const tweetDivided = document.getElementById('tweet-area')

/**
 * 指定した要素の子どもを全て削除する。
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { //子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) { //名前が空の時は処理を終了する処理 
        return;
    }

  //診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const result = assessment(userName);
  const paragraph = document.createElement('p');
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  //ツイートエリアの作成
  removeAllChildren(tweetDivided);

  //aタグを作って属性を追加
  const a = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
  + encodeURIComponent('あなたのいいところ')
  + '&ref_src=twsrc%5Etfw';
  
  a.setAttribute('href', hrefValue);
  a.className = 'twitter-hashtag-button';
  a.setAttribute('data-text', result);
  a.innerText = 'Tweet #あなたのいいところ';

  //aタグを HTML として追加
  tweetDivided.appendChild(a);

  //scriptタグを作る
  const script = document.createElement('script');
  script.setAttribute('src','https://platform.twitter.com/widgets.js');

  //scriptタグを HTML として追加
  tweetDivided.appendChild(script);
};

//enterキーで関数呼び出しを行う
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

const answers = [
    '{userName}のいいところは声です。',
    '{userName}のいいところはまなざしです。',
    '{userName}のいいところは情熱です。',
    '{userName}のいいところは厳しさです。',
    '{userName}のいいところは知識です。',
    '{userName}のいいところはユニークさです。',
    '{userName}のいいところは用心深さです。',
    '{userName}のいいところは見た目です。',
    '{userName}のいいところは決断力です。',
    '{userName}のいいところは思いやりです。',
    '{userName}のいいところは感受性です。',
    '{userName}のいいところは節度です。',
    '{userName}のいいところは好奇心です。',
    '{userName}のいいところは気配りです。',
    '{userName}のいいところはその全てです。',
    '{userName}のいいところは自制心です。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName
 * @return {string} 診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);

    return result;
};


//test cord
console.assert(
    assessment('くみ') === 'くみのいいところはその全てです。',
    'エラーです。'
); 
