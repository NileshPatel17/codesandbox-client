import React from 'react';
import { Alert } from 'app/components/Alert';
import { useOvermind } from 'app/overmind';

function DeleteDeploymentModal() {
  const {
    actions: {
      modalClosed,
      deployment: { deleteDeployment },
    },
  } = useOvermind();
  return (
    <Alert
      title="Delete Deployment"
      body={<span>Are you sure you want to delete this Deployment?</span>}
      onCancel={() => modalClosed()}
      onConfirm={() => deleteDeployment()}
    />
  );
}

export default DeleteDeploymentModal;
