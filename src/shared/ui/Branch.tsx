import React, { useContext } from 'react';

type BranchProps = {
  /** условие */
  when: boolean;
};

const BranchContext = React.createContext(false);

const Truthy: React.FC = ({ children }) => {
  const when = useContext(BranchContext);
  return when ? <>{children}</> : null;
};

const Falsy: React.FC = ({
  children,
}: React.PropsWithChildren<BranchProps>): React.ReactElement => {
  const when = useContext(BranchContext);
  return when ? null : <>{children}</>;
};

/**
 * Компонент с условным рендерингом
 *
 * @param props пропсы
 *
 * @returns компонент
 */

export const Branch = ({
  when,
  children,
}: React.PropsWithChildren<BranchProps>): React.ReactElement => (
  <BranchContext.Provider value={when}>{children}</BranchContext.Provider>
);

Branch.Truthy = Truthy;
Branch.Falsy = Falsy;
