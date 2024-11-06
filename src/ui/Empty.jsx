// Component that displays a dynamic message indicating no resources were found.
function Empty({ resourceName }) {
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
