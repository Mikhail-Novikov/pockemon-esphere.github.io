import React, { useMemo } from 'react';
import * as L from 'korus-ui';

import packageData from '@packageSrc';
import { currentDate, UiDate } from '@shared/lib/date';

export const Footer: React.FC = () => {
  const date = useMemo(() => currentDate(UiDate.Date), []);

  return (
    <L.Footer _inner _paddingY24 _marginTopAuto _secondary _txtSmall _txtGray>
      <L.Div className="right">8 (800) 100-8-812, бесплатно по РФ</L.Div>
      <L.Div>{`© СберКорус, ${date}`}</L.Div>
      Версия приложения:&nbsp;
      {packageData.version}
    </L.Footer>
  );
};
