import TableDisplayTranslation from '@/components/tableDisplayTranslation/TableDisplayTranslation';
import TableTranslation from '@/components/tableTranslation/TableTranslation';
import React from 'react';

interface TranslationTabProps {
    projectId: string;
    title: string;
}

const TranslationTab: React.FC<TranslationTabProps> = ({projectId, title }) => {
  return (
    <>
      <TableTranslation projectId={projectId} />
      <TableDisplayTranslation projectId={projectId} title={title} />
    </>
  );
};

export default TranslationTab;